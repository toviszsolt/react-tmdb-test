import styles from './styles/Layout.module.css'
import Strings from './Strings'

// ----- Container -------------------------------------------------------------------------------------------------- //

export const Container = ( { children } ) => {
    return (
        <div className={ styles.container }>
            {children }
        </div>
    )
}

// ----- App Bar ---------------------------------------------------------------------------------------------------- //

export const AppBar = () => {
    return (
        <header className={ styles.appbar }>
            <Container>
                { Strings.Defaults.TitleAppBar }
            </Container>
        </header>
    )
}

// ----- Hero ------------------------------------------------------------------------------------------------------- //

export const Hero = ( { children } ) => {
    return (
        <section className={ styles.hero }>
            {children }
        </section>
    )
}

// ----- Results ---------------------------------------------------------------------------------------------------- //

export const Results = ( { children } ) => {
    return (
        <section className="results">
            <Container>
                { children }
            </Container>
        </section>
    )
}

// ----- Footer ----------------------------------------------------------------------------------------------------- //

export const Footer = () => {
    return (
        <footer className={ styles.footer }>
            <Container>
                <div>{ Strings.Defaults.Line1Footer } </div>
                <a href={ Strings.Defaults.LinkFooter } target="_blank" rel="noreferrer">
                    { Strings.Defaults.Line2Footer }
                </a>
            </Container>
        </footer>
    )
}
