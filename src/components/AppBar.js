import './AppBar.css';

const AppBar = ( props ) => {
    return (
        <header className="appbar">{ props.children }</header>
    )
}

export default AppBar;
