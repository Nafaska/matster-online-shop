import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllLogs } from "../reducers/logs";

const Logs = () => {
  const dispatch = useDispatch();
  const listOfLogs = useSelector((callback) => callback.logs.listOfLogs);

  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/v1/logs",
      data: {
        time: +new Date(),
        action: `navigate to ${window.location.pathname} page`,
      },
    });
    dispatch(getAllLogs());
    return () => {};
  }, [dispatch]);

  return (
    <div>
      {Object.values(listOfLogs).map((log) => (
        <div>
          <code key={log.time}>
            {new Date(log.time).toLocaleString()} - {log.action}
          </code>
        </div>
      ))}
    </div>
  );
};

export default Logs;