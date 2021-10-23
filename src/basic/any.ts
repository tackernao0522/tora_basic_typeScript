export default function anySample() {
  let name: any = 'Torahack' // string型を代入したよ
  console.log('any sample 1:', typeof name, name)
  // any sample 1: string Torahack

  name = 28 // anyだと許容してしまう
  console.log('any sample 2:', typeof name, name)
  // any sample 2: number 28
}
