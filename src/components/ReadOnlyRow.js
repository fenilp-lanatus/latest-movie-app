import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  //   console.log(contact);
  return (
    <tr>
      <td>{contact.original_title}</td>
      <td>{contact.vote_count}</td>
      <td>{contact.release_date}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        {/* <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button> */}
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
