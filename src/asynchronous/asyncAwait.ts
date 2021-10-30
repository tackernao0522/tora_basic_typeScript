export default async function asyncAwaitSample() {
  const url = 'https://api.github.com/users/tackernao0522'

  type Profile = {
    login: string
    id: number
  }

  type FetchProfile = () => Promise<Profile | null>

  const fetchProfile: FetchProfile = async () => {
    const response = await fetch(url)
      .then((res) => res)
      .catch((error) => {
        console.error(error)
        return null
      })

    if (!response) {
      return null
    }

    const json = await response
      .json()
      .then((json: Profile) => {
        console.log('AsyncChronous async/await Sample 1:', json)
        return json
      })
      .catch((error) => {
        console.log(error)
        return null
      })

    if (!json) {
      return json
    }

    return json
  }

  const profile = await fetchProfile()
  if (profile) {
    console.log('AsyncChronous async/await Sample 2:', profile)
  }
}
