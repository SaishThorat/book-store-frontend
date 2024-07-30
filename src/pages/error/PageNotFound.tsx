import React from 'react';
import {Link} from 'react-router-dom';
import '../../assets/css/PageNotFound.css'
import Layout from '../../layout/Layout';

const PageNotFound = () => {
  return (
    <Layout title={"Page Not Found"}>
      <div className="pnf">
        <h1 className="pnf_title">404</h1>
        <h2 className="pnf_heading">Oops! Page Not Found</h2>
        <Link to="/homepage" className="pnf_btn">Go Back</Link>
      </div>
    </Layout>
  )
}

export default PageNotFound
