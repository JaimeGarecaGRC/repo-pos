import { screen, render, cleanup, fireEvent } from '@testing-library/react'
import Users from "../src/interfaces/pages/Users"

test('La pagina de usuarios debería mostrar una tabla con todos los usuarios', () => { 
    //render the component on virtual dom
    render(<Users />)
    const title = "Usuarios"
    expect(screen.getByText(title)).toBeInTheDocument()
 })