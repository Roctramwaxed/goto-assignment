import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Spinner } from "react-bootstrap";

const GET_CONTACT_LIST = gql`
  query GetContactList(
    $distinct_on: [contact_select_column!]
    $limit: Int
    $offset: Int
    $order_by: [contact_order_by!]
    $where: contact_bool_exp
  ) {
    contact(
      distinct_on: $distinct_on
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: $where
    ) {
      created_at
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`;

export const displayContacts = async () => {
  const { users } = await fetch("https://dummyjson.com/users")
    .then((res) => res.json())
    .then((res) => res);

  localStorage.setItem(
    "users",
    JSON.stringify(
      users.map((e: { id: 0; firstName: ""; lastName: ""; phone: [] }) => ({
        id: e.id,
        name: `${e.firstName} ${e.lastName}`,
        phone: [e.phone],
      }))
    )
  );
  dispatchEvent(new Event("storage-init"));
  // const { loading, error, data } = useQuery(GET_USERS);

  // if (loading) return <Spinner animation="border" />;
  // if (error) return <span>{`error :(`}</span>;

  // return <span>hey</span>;
};

export const addContact = () => {
  const users = JSON.parse(localStorage.getItem("users") || "");
};

export const setFav = (
  user = {
    id: 0,
    firstName: "",
    lastName: "",
    phone: "",
    fav: false,
  }
) => {
  const favUsers = JSON.parse(localStorage.getItem("fav") || "");
  user.fav = true;

  const compare = (a = { ...user }, b = { ...user }) => {
    if (a.firstName <= b.firstName) {
      return -1;
    }
    if (a.firstName > b.firstName) {
      return 1;
    }
    return 0;
  };

  favUsers.push(user).sort(compare);

  localStorage.setItem("fav", favUsers);

  return favUsers;
};

export const useQueryParams = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};
