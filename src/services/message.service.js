const messageCodes = {
  "notes.saved": "Note saved!",
  "PERMISSION_DENIED: Permission denied":
    "Your note could not be saved! (Permission Denied)",
  "The email address is badly formatted.":
    "Study key is in incorrectly formatted!",
  "There is no user record corresponding to this identifier. The user may have been deleted.":
    "Participant not found!",
  "Client doesn't have permission to access the desired data.":
    "Can't log in (no permissions to the database). Please contact amish.khan@wustl.edu.",
  "session.ended":
    "Thanks for participating! Feel free to jot down anything special in a Note.",
};

export const txlate = function(thisKey) {
  for (let code in messageCodes) {
    if (thisKey.includes(code)) return messageCodes[code];
  }
};
