import SearchPlusFilters from "../../../components/searchPlusFilters";
import data from "../../../utilities/userData";

const UserTable = ({ handleClick }) => {
      return (
            <div className="users">
                  <div className="user-list">
                        <SearchPlusFilters />
                        <table className="user-table">
                              <thead>
                                    <tr>
                                          <th>name</th>
                                          <th>email</th>
                                          <th>phone</th>
                                          <th>country</th>
                                          <th>city</th>
                                          <th>address</th>
                                          <th>role</th>
                                          <th>last seen</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {data.map((detail) => (
                                          <tr onClick={() => handleClick(detail.id)} key={detail.email}>
                                                <td>{detail.name}</td>
                                                <td>{detail.email}</td>
                                                <td>{detail.phone}</td>
                                                <td>{detail.country}</td>
                                                <td>{detail.city}</td>
                                                <td>{detail.address}</td>
                                                <td>{detail.role}</td>
                                                <td>{detail.date}</td>
                                          </tr>
                                    ))}
                              </tbody>
                        </table>
                  </div>
            </div>
      );
};

export default UserTable;
