export default function notExistSample() {
  let name = null
  console.log('notExist sample 1:', typeof name, name)
  // notExist sample 1: object null

  name = 'torahack'
  if (name) {
    console.log('notExsit sample 2:', '吾輩は猫である。名前は' + name)
    // notExsit sample 2: 吾輩は猫である。名前はtorahack
  } else {
    console.log('notExsit sample 3:', '吾輩は猫である。名前はまだ' + name)
    // notExsit sample 3: 吾輩は猫である。名前はまだnull
  }

  let age = undefined
  console.log('notExist sample 4:', typeof age, age)
  // notExist sample 4: undefined undefined

  age = 53
  if (age) {
    console.log('notExist sample 5:', '年齢は' + age + 'です')
    // notExist sample 5: 年齢は53です
  } else {
    console.log('notExist sample 6:', '年齢は秘密です')
    // notExist sample 6: 年齢は秘密です
  }
}
