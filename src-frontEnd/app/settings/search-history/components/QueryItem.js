import React, {Component} from "react";
import PropTypes from "prop-types";
import Moment from "moment";

class QueryItem extends Component {
    render() {
        const {data, order} = this.props;
        const {type, keyword, created} = data;
        const id = data._id;

        const link = keyword ? (type ? `/a/items?page=1&term=${keyword}&searchType=${type}&sortByField=rank`
                                    : `/a/items?page=1&term=${keyword}&sortByField=rank` ) : ''
        const key = link ? <a href={link} target="_blank">{keyword}</a> : ''

        const timeHistoryFormat = Moment(created).format('DD/MM/YYYY, hh:mm:ss A');

        return (
            <tr className='Query' id={`Query-${id}`} key={id}>
                <td className='order'>{order}</td>
                <td className='keyword'>{key}</td>
                <td className='type'>{type || ''}</td>
                <td className='created'>
                    <span>{timeHistoryFormat}</span>
                </td>
            </tr>
        );
    }
}

QueryItem.propTypes = {
    order: PropTypes.number,
    data: PropTypes.object
}

export default QueryItem;