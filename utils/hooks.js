export const findChangedParticipants = (
  oldParticipants,
  oldNotRegisteredParticipates,
  newParticipants
) => {
  // Extract IDs from old registered participants
  const oldParticipantIds = new Set(
    oldParticipants.map((p) => p._id.toString())
  );

  // Extract IDs from old not registered participants
  const oldNotRegisteredParticipantIds = new Set(
    oldNotRegisteredParticipates.map((p) => p._id.toString())
  );

  // Find new participant IDs that are not in the old participant IDs or old not registered participant IDs
  const newIdsWithEmails = newParticipants
    .filter(
      (p) =>
        p.value &&
        !oldParticipantIds.has(p.value.toString()) &&
        !oldNotRegisteredParticipantIds.has(p.value.toString())
    )
    .map((p) => ({ id: p.value, label: p.label }));

  return newIdsWithEmails;
};
