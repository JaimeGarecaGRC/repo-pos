//TODO borrar este archivo
export const columns = [
    {
      Header: "Passenger name",
      accessor: "name",
    },
    {
      Header: "Total trips",
      accessor: "trips",
    },
    {
      Header: "Current flight",
      accessor: "flightName",
    },
  ];
  
  export const formatRowData = (rawData) =>
    rawData.map((info) => ({
      name: info.name,
      trips: info.trips,
      flightName: info.airline?.name,
    }));
  
  export const getData = async (pageNumber = 1) => {
    const response = await fetch(
      `https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=15`
    );
    return await response.json();
  };
  