import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment";
import classNames from "classnames";
import ShowAffiliatePerPage from "./ShowAffiliatePerPage";
import { Button, Card, CardBody, Table } from "reactstrap";
import {
  exportAffiliate,
  getAffiliate,
} from "../../../../services/payments/BillServices";
import StorageServices from "../../../../services/StorageServices";

class AffiliatePage extends Component {
  state = {
    affiliates: [],
    page: 1,
    perPage: 10,
  };

  _handleExport = () => {
    // call api to export csv from billing service
    exportAffiliate().then((res) => {
      // if res not success, return alert error
      if (!res || (typeof res == "object" && !res.success)) {
        return alert(res.message || "Something went wrong");
      }

      const link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([res]));
      link.download = "affiliate.csv";
      link.click();
    });
  };

  _handleAffiliate = () => {
    getAffiliate(this.state.page, this.state.perPage).then((data) => {
      this.setState({
        affiliates: data.affiliates,
        pages: data.pages,
        page: data.page,
      });
    });
  };

  _handlePageClick = (data) => {
    const { selected } = data;
    getAffiliate(selected + 1, this.state.perPage).then((data) => {
      this.setState({
        affiliates: data.affiliates,
        pages: data.pages,
        page: data.page,
      });
    });
  };

  _handleChangePaginationPerPage = (perPage) => {
    getAffiliate(1, perPage).then((data) => {
      this.setState({
        affiliates: data.affiliates,
        pages: data.pages,
        page: 1,
        perPage: data.limit,
      });
    });
  };

  componentDidMount() {
    this._handleAffiliate();
  }

  render() {
    const { profile } = StorageServices.getUserData();
    const { affiliates, pages, page, perPage } = this.state;

    return (
      <div className="ReferralsPage">
        <div className="ReferralStatistic">
          <h4 className="card-title">Affiliate</h4>
          <div className="card">
            <table className="table">
              <tbody>
                <tr className="referral-row">
                  <td className="row-title">Affiliate Link</td>
                  <td>
                    {`${window.location.origin}/login?code=${
                      profile ? profile.affiliateCode : ""
                    }`}
                  </td>
                </tr>
                <tr className="referral-row">
                  <td className="row-title">Statistics</td>
                  <td>
                    <Button color="primary" onClick={this._handleExport}>
                      Export CSV
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {affiliates && affiliates.length > 0 && (
            <div className="mt-4">
              <h4 className="card-title">Statistics</h4>
              <Card>
                <Table style={{ color: "#333" }}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Affiliate Code</th>
                      <th>Email</th>
                      <th>Plan</th>
                      <th>Price</th>
                      <th>Register Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {affiliates.map((affiliate, index) => {
                      const affiliateIndex = (page - 1) * perPage + index + 1;
                      return (
                        <tr key={index}>
                          <th scope="row">{affiliateIndex}</th>
                          <td>{affiliate.code ? affiliate.code : ""}</td>
                          <td>{affiliate.email ? affiliate.email : ""}</td>
                          <td>{affiliate.plan ? affiliate.plan : ""}</td>
                          <td>
                            {!!affiliate ? `$ ${affiliate.price || 0}` : ""}
                          </td>
                          <td>
                            {affiliate.register_date
                              ? moment(affiliate.register_date).format(
                                "MMMM D, YYYY"
                                )
                              : ""}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card>
              <div className={classNames("KeywordPagination mt-3")}>
                <ShowAffiliatePerPage
                  perPage={perPage}
                  onChangePerPage={this._handleChangePaginationPerPage}
                />
                <div className="PaginationItems">
                  <ReactPaginate
                    previousLabel="<"
                    nextLabel=">"
                    pageCount={pages}
                    forcePage={page - 1}
                    disableInitialCallback={true}
                    onPageChange={this._handlePageClick.bind(this)}
                    containerClassName={"pagination"}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    nextClassName="page-item"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                  />
                </div>
              </div>
            </div>
          )}
          <h5 className="mt-4 card-title">Term and Policy</h5>
          <Card>
            <CardBody>
              <ol style={{ color: "#333" }}>
                <li>
                  Sign up for SpyAmz and get an affiliate link. This link was
                  automatically generated and is accessible from the affiliate
                  page.
                </li>

                <li>
                  You can refer new users to SpyAMZ through that link and you’ll
                  receive a percentage of their first purchase of an item of
                  those users.
                </li>

                <li>
                  Affiliate program percentage: The earnings you will get for
                  successfully participating in the Affiliate Program are set
                  out on the affiliate page. The commission fee can be changed.
                  To learn more, get in touch with us.
                </li>

                <li>
                  Verify data: To check the user count, download the CSV file.
                  We will get in touch with you and give you a commission at the
                  end of the month.
                </li>
              </ol>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

AffiliatePage.propTypes = {
  onChangeReferralStatus: PropTypes.func.isRequired,
};

export default AffiliatePage;
