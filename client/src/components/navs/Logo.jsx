import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link
    to={"/"}
    className="
  flex 
  items-center
  pr-4
  "
  >
    {/* <img className="h-10 rounded-full" src={logo} /> */}
    <h1 className="text-[32px] font-logo mr-2">V</h1>
    <span className="text-lg font-word hidden md:block">Vivadh</span>
  </Link>
  )
}

export default Logo
