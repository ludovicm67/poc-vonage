import OT, { OTError } from "@opentok/client";
import { useEffect } from "react";

type ClientProps = {
  name: string;
  sessionId: string;
  token: string;
  apiKey: string;
};

const Client = (props: ClientProps) => {
  const { name, sessionId, token, apiKey } = props;

  const handleError = (error?: OTError) => {
    if (!error) {
      return;
    }

    console.error(error);
  };

  useEffect(() => {
    const session = OT.initSession(apiKey, sessionId);
    session.on("streamCreated", (e) => {
      console.log(e);
    });

    // subscribe to a newly created stream
    session.on("streamCreated", (event) => {
      session.subscribe(
        event.stream,
        "subscriber",
        {
          insertMode: "append",
          width: "100%",
          height: "100%",
        },
        handleError
      );
    });

    // create a publisher
    const publisher = OT.initPublisher(
      "publisher",
      {
        insertMode: "append",
        width: "100%",
        height: "100%",
      },
      handleError
    );

    // connect to the session
    session.connect(token, (error) => {
      // if the connection is successful, initialize a publisher and publish to the session
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="client">
      <div id="publisher"></div>
      <div id="subscriber"></div>
    </div>
  );
};

export default Client;
