import ts from 'typescript';
import fs from 'node:fs';
const files = [...fs.readdirSync('src/components').filter(f=>f.endsWith('.tsx') && !['site-preferences.tsx','social-links.tsx'].includes(f)).map(f=>'src/components/'+f), 'src/app/page.tsx', 'src/app/news/[slug]/page.tsx'];
const collected = new Set();
for (const file of files) {
  const source = fs.readFileSync(file,'utf8');
  if (/import \{ Text(?:,| \})/.test(source)) continue;
  const ast = ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  const edits=[];
  const client=source.includes('"use client"');
  let needsHook=false;
  function visit(n) {
    if (ts.isJsxText(n)) {
      let value = n.getText(ast).replace(/\s+/g,' ').trim().replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&lt;/g,'<');
      if(value) {
        collected.add(value);
        if(!n.getText(ast).includes('\n')) { if(/^\s/.test(n.getText(ast))) value=' '+value; if(/\s$/.test(n.getText(ast))) value+=' '; }
        edits.push([n.getStart(ast),n.end,`<Text value={${JSON.stringify(value)}} />`]);
      }
    }
    if (ts.isJsxExpression(n) && n.expression && (ts.isJsxElement(n.parent)||ts.isJsxFragment(n.parent))) {
      const e=n.expression;
      if(ts.isPropertyAccessExpression(e)||ts.isIdentifier(e)||ts.isStringLiteral(e)||ts.isTemplateExpression(e)||ts.isConditionalExpression(e)&&!e.getText(ast).includes('<')) {
        edits.push([n.getStart(ast),n.end,`<Text value={${e.getText(ast)}} />`]);
      }
    }
    if (client && ts.isJsxAttribute(n) && ['aria-label','alt','placeholder','title'].includes(n.name.getText(ast)) && n.initializer) {
      const init=n.initializer;
      if(ts.isStringLiteral(init) && init.text) { collected.add(init.text); edits.push([init.getStart(ast),init.end,`{t(${JSON.stringify(init.text)})}`]); needsHook=true; }
      if(ts.isJsxExpression(init)&&init.expression) { edits.push([init.getStart(ast),init.end,`{t(${init.expression.getText(ast)})}`]); needsHook=true; }
    }
    if(ts.isJsxOpeningElement(n) && n.tagName.getText(ast)==='option' && !n.attributes.properties.some(p=>ts.isJsxAttribute(p)&&p.name.getText(ast)==='value')) {
      const el=n.parent;
      const raw=el.children.map(c=>ts.isJsxText(c)?c.getText(ast):ts.isJsxExpression(c)&&c.expression?`{${c.expression.getText(ast)}}`:'').join('').trim();
      edits.push([n.tagName.end,n.tagName.end,` value=${raw.startsWith('{')?raw:JSON.stringify(raw.replace(/&amp;/g,'&'))}`]);
    }
    ts.forEachChild(n,visit);
  }
  visit(ast);
  if(needsHook) {
    function hooks(n) {
      if(ts.isFunctionDeclaration(n)&&n.name&&/^[A-Z]/.test(n.name.text)&&n.body) edits.push([n.body.getStart(ast)+1,n.body.getStart(ast)+1,'\n  const { t } = useLocale();']);
      ts.forEachChild(n,hooks);
    }
    hooks(ast);
  }
  edits.sort((a,b)=>b[0]-a[0]);
  let output=source;
  for(const [start,end,replacement] of edits) output=output.slice(0,start)+replacement+output.slice(end);
  const insert=output.startsWith('"use client";')?output.indexOf('\n')+1:0;
  output=output.slice(0,insert)+`import { Text${needsHook?', useLocale':''} } from "@/components/site-preferences";\n`+output.slice(insert);
  output=output.replace(/ lang="en"/g,'');
  fs.writeFileSync(file,output);
}
for(const file of fs.readdirSync('src/data').filter(f=>f.endsWith('.ts'))) {
  const source=fs.readFileSync('src/data/'+file,'utf8');
  const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true);
  function collect(n) {
    if(ts.isStringLiteral(n) && (/[A-Z][a-z]/.test(n.text)||n.text.includes(' ')) && !n.text.startsWith('/') && !n.text.startsWith('http') && !n.text.includes('@')) {
      const prop=ts.isPropertyAssignment(n.parent)?n.parent.name.getText(ast):'';
      if(!['keywords','id','path','image','source','pdf','date','month'].includes(prop)) collected.add(n.text);
    }
    ts.forEachChild(n,collect);
  }
  collect(ast);
}
fs.writeFileSync('review/translation-strings.json',JSON.stringify([...collected].sort(),null,2));
console.log(collected.size+' text entries collected');
