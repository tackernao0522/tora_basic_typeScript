export default function tupleSample() {
  // 一般的なタプルの型定義
  const response: [number, string] = [200, 'OK']
  // response = [400, "Bad Request", "Email parameter is missing"] // エラー
  // response = ["400", "Bad Request"] // エラー
  console.log('Array tuple sample 1', response)

  // 可変長引数を使ったタプル 第一引数は一つ目の型
  const girlfriends: [string, ...string[]] = ['Kana', 'Miku', 'Keiko']
  girlfriends.push('Misa')
  console.log('Array tuple sample 2', girlfriends)
}
