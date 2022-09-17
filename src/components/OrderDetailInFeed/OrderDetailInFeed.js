import React from 'react';
import {Link, useHistory, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

function OrderDetailInFeed() {
  const { id } = useParams();
  const location = useLocation();
  return (
    <div>OrderDetailInFeed {id} </div>
  )
}

export default OrderDetailInFeed