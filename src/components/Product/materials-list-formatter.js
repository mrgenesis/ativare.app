
export default function materialsListFormatter(materials) {
  let txt = ''; 
  if(Array.isArray(materials)) {
    materials.map(mat => txt += `(${mat.code}) ${mat.name} / Limite: ${mat.charge}\n`);
  }
  return txt;
}
