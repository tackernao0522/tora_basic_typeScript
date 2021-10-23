export default function unknownSample() {
  const maybeNumber: unknown = 10
  console.log('unknown sample 1:', typeof maybeNumber, maybeNumber)
  // unknown sample 1: number 10

  const isFoo = maybeNumber === 'foo'
  console.log('unknown sample 2:', typeof isFoo, isFoo)
  // unknown sample 2: boolean false

  // const sum = maybeNumber + 10 計算できない

  if (typeof maybeNumber === 'number') {
    // 本当にnumber型なのか調べてからだと計算可能
    const sum = maybeNumber + 10
    console.log('unknown sample 3:', typeof sum, sum)
    // unknown sample 3: number 20
  }
}
