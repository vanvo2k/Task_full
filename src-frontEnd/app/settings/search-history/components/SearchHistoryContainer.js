import React, {Component} from 'react'
import SearchHistory from "./SearchHistory";
import DocTitle from "../../../../shared-components/DocTitle"

class SearchHistoryContainer extends Component {
    render() {
        return (
            <DocTitle title="Search history">
                <SearchHistory/>
            </DocTitle>
        )
    }
}

export default SearchHistoryContainer