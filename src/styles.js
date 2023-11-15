// MODAL STYLES
export const editModalStyle = {
  borderRadius: "15px",
  border: "1px solid rgba(233, 150, 122, 0.197)",
  fontFamily: "ui-monospace",
  background: "none",
  "-webkit-backdrop-filter": "blur(10px)",
  backdropFilter: "blur(10px)",
};

export const paymentModalStyle = {
  main: {
    borderRadius: "15px",
    fontFamily: "ui-monospace",
    background: "none",
    "-webkit-backdrop-filter": "blur(30px)",
    backdropFilter: "blur(30px)",
    border: "1px solid #69c88146",
  },
  header: {
    color: "#69c881",
    fontFamily: "ui-monospace",
    fontSize: "1em",
  },
  itemContainer: {
    width: "70vw",
    maxHeight: "40vh",
    color: "white",
    fontSize: "50px",
  },
  item: {
    width: "100%",
    marginBottom: "10px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.8rem",
    height: "50px",
    textAlign: "center",
  },
  close: {
    fontFamily: "ui-monospace",
    textTransform: "lowercase",
    color: "#69c881",
  },
};

// FAB STYLES
export const fabStyle = {
  borderRadius: "50%",
  height: 56,
  width: 56,
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  right: 16,
  color: "white",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};

// NAVBAR STYLE
export const navStyle = {
  width: "100%",
  height: "10vh",
  backgroundColor: "transparent",
  textColor: "white",
  position: "fixed",
  bottom: 0,
  background: "none",
  "-webkit-backdrop-filter": "blur(30px)",
  backdropFilter: "blur(30px)",
};

//UTANG ITEM ICON
export const utangItemIconStyle = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  marginLeft: 15,
  marginRight: 15,
};

export const toastStyle = {
  borderRadius: "50px",
  background: "none",
  backdropFilter: "blur(10px)",
  "-webkit-backdrop-filter": "blur(10px)",
  color: "#fff",
  fontFamily: "ui-monospace",
  fontSize: "0.8rem",
};

export const selectStyle = {
  ".MuiSvgIcon-root ": {
    fill: "white !important",
  },
};

export const swipeActionStyle = {
  display: "flex",
  color: "white",
  fontFamily: "ui-monospace",
  justifyContent: "center",
  alignItems: "center",
};
