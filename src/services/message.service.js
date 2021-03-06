const messageCodes = {
  "notes.saved": "Note saved!",
  "User records note": "Your note could not be saved! (Permission denied)",
  "User authenticates self and begins training session":
    "Cannot begin training session! (Permission denied)",
  "The email address is badly formatted.": "Study ID incorrectly formatted!",
  "There is no user record corresponding to this identifier. The user may have been deleted.":
    "Participant not found!",
  "Client doesn't have permission to access the desired data.":
    "Can't log in (Permission denied). Please contact amish.khan@wustl.edu.",
  "session.ended":
    "Thanks for training! Be sure to jot down anything special in a note.",
};

export const txlate = function(thisKey) {
  for (let code in messageCodes) {
    if (thisKey.includes(code)) return messageCodes[code];
  }
};
