import React, {Component, Fragment} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {ButtonDropdown, DropdownMenu, DropdownToggle} from "reactstrap";
import {_createQuery, _deleteQuery, _getListQueries} from "../../../../../services/GgsQueryServices";
import ListQueries from "./ListQueries";
import PaginationQueries from "./PaginationQueries";
import CreateQuery from "./CreateQuery";
import FormSearchQuery from "./FormSearchQuery";
import withViewport from "../../../../../shared-components/withViewport";

class AnalyticActions extends Component {
    state = {
        openFormCreate: false,
        dropDownButton: false,
        queries: [],
        meta: {
            page: 1,
            pages: 0,
            limit: this.props.isMobile ? 5 : 10,
            total: 0
        },
        searchTerm: '',
        needFetch: false
    };

    componentDidMount() {
        this._fetchListQueries();
    }

    componentDidUpdate(prevProps, prevState) {
        const {searchTerm, meta, needFetch} = this.state;

        if ((searchTerm + "") !== (prevState.searchTerm + "")) {
            return needFetch && this._fetchListQueries(1);
        }

        if (meta.page !== prevState.meta.page) {
            needFetch && this._fetchListQueries();
        }
    }

    _handleToggleFormCreate = () => {
        this.setState(({openFormCreate, dropDownButton}) => ({
            openFormCreate: !openFormCreate,
            dropDownButton: !openFormCreate ? false : dropDownButton
        }));
    };

    _fetchListQueries(forcePage = null) {
        const {meta, searchTerm} = this.state;
        const {page, limit} = meta;

        const pageValidated = forcePage || page;

        this.setState({
            needFetch: false
        });

        _getListQueries({page: pageValidated, limit, term: searchTerm})
            .then(response => {
                const {success, data} = response;

                if (success) {
                    const {docs, page, limit, pages, total} = data;

                    this.setState({
                        queries: docs,
                        meta: {
                            page,
                            pages,
                            limit,
                            total
                        }
                    });
                }
            });
    }

    _onToggleDropDown() {
        this.setState(({dropDownButton, openFormCreate}) => ({
            dropDownButton: !dropDownButton,
            openFormCreate: !dropDownButton ? false : openFormCreate
        }));
    }

    _handleChangePage = (page) => {
        const pageValidated = Math.abs(parseInt(page, 10));

        this.setState(({meta}) => ({
            meta: {
                ...meta,
                page: pageValidated
            },
            needFetch: true
        }));
    };

    _handleChangeQuery = (query) => {
        this.setState({
            dropDownButton: false
        });

        this.props.changeQuery(query)
            .then(() => {
                this.props.triggerSearch();
            });
    };

    _handleCreateQuery = (title) => {
        const {query} = this.props;

        this.setState({
            openFormCreate: false
        });

        _createQuery({query, title})
            .then(response => {
                const {data, success} = response;

                if (success) {
                    this.setState(({queries}) => ({
                        queries: [].concat([data], queries)
                    }));
                }
            });
    };

    _handleDeleteQuery = (query) => {
        const queryId = query._id || '';
        if (!queryId) {
            return;
        }

        _deleteQuery(queryId)
            .then(response => {
                const {success} = response;

                if (success) {
                    this.setState(({queries}) => {
                        return {
                            queries: queries.filter(query => query._id !== queryId)
                        };
                    });
                }
            });
    };

    _handleSearchTerm = (term) => {
        this.setState({
            searchTerm: term,
            needFetch: true
        });
    };

    render() {
        const {className} = this.props;
        const {dropDownButton, queries, meta, searchTerm, openFormCreate} = this.state;
        const {page, pages} = meta;

        const hasQuery = !!queries && !!queries.length;

        return (
            <div className={classNames("AnalyticActions text-right", className)}>
                {
                    <ButtonDropdown
                        isOpen={dropDownButton}
                        toggle={this._onToggleDropDown.bind(this)}
                        color="secondary">
                        <CreateQuery onToggle={this._handleToggleFormCreate}
                                     isOpen={openFormCreate}
                                     onCreate={this._handleCreateQuery}/>
                        {
                            (hasQuery || !!searchTerm) &&
                            <Fragment>
                                <DropdownToggle caret/>

                                <DropdownMenu className="Dropdown" right>
                                    <FormSearchQuery onSearch={this._handleSearchTerm}/>

                                    <ListQueries
                                        onRemove={this._handleDeleteQuery}
                                        changeQuery={this._handleChangeQuery}
                                        queries={queries}/>

                                    <PaginationQueries
                                        page={page} pages={pages}
                                        onChangePage={this._handleChangePage}/>
                                </DropdownMenu>
                            </Fragment>
                        }
                    </ButtonDropdown>
                }
            </div>
        );
    }
}

AnalyticActions.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    query: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    triggerSearch: PropTypes.func.isRequired,
    changeQuery: PropTypes.func.isRequired,
};

export default withViewport(AnalyticActions);