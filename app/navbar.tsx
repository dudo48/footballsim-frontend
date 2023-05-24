import NavBarItem from './navbaritem'

function NavBar() {
  return (
    <nav>
      <ul className="flex gap-8 rounded px-2">
        <NavBarItem href="/teams">Teams</NavBarItem>
        <NavBarItem href="/matches">Matches</NavBarItem>
      </ul>
    </nav>
  )
}

export default NavBar
