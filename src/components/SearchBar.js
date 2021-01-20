
import styles from "./styles/SearchBar.module.css"
import Strings from './Strings'
import { Button } from "./Core"

const SearchBar = () => {
    return (
        <>
            <h1 className={ styles.title }>
                { Strings.Main.TitleHeroQuote } &mdash; <i>{ Strings.Main.TitleHeroAuthor }</i>
            </h1>
            <label className={ styles.search }>
                <input type="text" name="search" placeholder={ Strings.Main.LabelSearchField } />
                <Button type="submit" text={ Strings.Main.LabelSearchButton } />
            </label>
        </>
    )
}

export default SearchBar
