import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {UncontrolledTooltip} from "reactstrap";

class ListQueries extends Component {
    _handleClickChangeQuery = (query, e) => {
        e.preventDefault();

        const {args} = query;
        this.props.changeQuery(args);
    };

    _handleClickRemove = (query, e) => {
        e.preventDefault();
        e.stopPropagation();

        this.props.onRemove(query);
    };

    render() {
        const {queries} = this.props;

        return (
            <ul className="ListQueries">
                {
                    (!queries || !queries.length) &&
                    <li className="Query NoResult">No results.</li>
                }
                {
                    queries.map(query => {
                        const {title, creator, description} = query;

                        return (
                            <li className="Query d-flex justify-content-between"
                                key={query._id}
                                onClick={(e) => {
                                    this._handleClickChangeQuery(query, e)
                                }}>
                                <div className="Content">
                                    {
                                        creator === 'bot' && description ?
                                            <Fragment>
                                                <UncontrolledTooltip placement="bottom" target={`query-${query._id}`}>
                                                    {description}
                                                </UncontrolledTooltip>
                                                <span id={`query-${query._id}`}
                                                      className="Icon linear-question-circle"/>
                                            </Fragment> :
                                            <i className="Icon linear-pie-chart2"/>
                                    }
                                    <span className="Name">{title || 'Unnamed'}</span>

                                </div>
                                <span
                                    onClick={(e) => this._handleClickRemove(query, e)}
                                    className="Remove"/>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
}

ListQueries.propTypes = {
    queries: PropTypes.array,
    changeQuery: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default ListQueries;