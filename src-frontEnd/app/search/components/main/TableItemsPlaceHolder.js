import React, {Component} from "react";
import classNames from "classnames";
import TableHead from "./TableHead";

class TableItemsPlaceHolder extends Component {
    render() {
        return (
            <div className={classNames("TableItemsPlaceHolder")}>
                <TableHead/>

                <div className="Tbody">
                    <div className="Tr">
                    </div>
                </div>

            </div>
        );
    }
}

export default TableItemsPlaceHolder;