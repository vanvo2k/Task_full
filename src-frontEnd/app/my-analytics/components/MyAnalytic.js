import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Card, CardBody, CardFooter, CardHeader, CardTitle} from "reactstrap";
import parseQueryObject from "../../../helpers/product/parseQueryObject";
import queryObjectToSearch from "../../../helpers/product/queryObjectToSearch";
import {Link} from "react-router-dom";
import SearchControl from "./SearchControl";
import FilterControl from "./FilterControl";
import SortByControl from "./SortByControl";

class MyAnalytic extends Component {
    render() {
        const {item} = this.props;
        const args = item.get('args');
        const title = item.get('title');

        const {filter, search, sort} = parseQueryObject(args.toJS());

        const searchQuery = queryObjectToSearch({
            ...args.toJS(),
            analytic: item.get('_id')
        });

        return (
            <Card className="MyAnalytic">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>

                <CardBody>
                    <SearchControl {...search}/>
                    <FilterControl {...filter}/>
                    <SortByControl {...sort}/>
                </CardBody>

                <CardFooter className="d-flex">
                    <div className="ml-auto">
                        <Button tag={Link} to={`/a/items?${searchQuery}`}
                                color="secondary" className="Edit">Edit Query</Button>
                        <Button color="danger"
                                onClick={this._handleClickRemove.bind(this)}
                                className="Remove">Remove Query</Button>
                    </div>
                </CardFooter>
            </Card>
        );
    }

    _handleClickRemove() {
        const {item, fetchRemoveMyAnalytic} = this.props;
        const itemID = item.get('_id');

        fetchRemoveMyAnalytic(itemID);
    }
}

MyAnalytic.propTypes = {
    item: PropTypes.object,
    fetchRemoveMyAnalytic: PropTypes.func.isRequired,
};

export default MyAnalytic;