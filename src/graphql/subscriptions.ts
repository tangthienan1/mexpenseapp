/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($filter: ModelSubscriptionNoteFilterInput) {
    onCreateNote(filter: $filter) {
      id
      date
      title
      content
      tripID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($filter: ModelSubscriptionNoteFilterInput) {
    onUpdateNote(filter: $filter) {
      id
      date
      title
      content
      tripID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($filter: ModelSubscriptionNoteFilterInput) {
    onDeleteNote(filter: $filter) {
      id
      date
      title
      content
      tripID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateExpense = /* GraphQL */ `
  subscription OnCreateExpense($filter: ModelSubscriptionExpenseFilterInput) {
    onCreateExpense(filter: $filter) {
      id
      amount
      type
      location
      date
      comment
      tripID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateExpense = /* GraphQL */ `
  subscription OnUpdateExpense($filter: ModelSubscriptionExpenseFilterInput) {
    onUpdateExpense(filter: $filter) {
      id
      amount
      type
      location
      date
      comment
      tripID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteExpense = /* GraphQL */ `
  subscription OnDeleteExpense($filter: ModelSubscriptionExpenseFilterInput) {
    onDeleteExpense(filter: $filter) {
      id
      amount
      type
      location
      date
      comment
      tripID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateTrip = /* GraphQL */ `
  subscription OnCreateTrip($filter: ModelSubscriptionTripFilterInput) {
    onCreateTrip(filter: $filter) {
      id
      tripName
      destination
      budget
      date
      tag
      description
      isRequiredRiskAssessment
      userID
      Expenses {
        nextToken
        startedAt
      }
      Notes {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateTrip = /* GraphQL */ `
  subscription OnUpdateTrip($filter: ModelSubscriptionTripFilterInput) {
    onUpdateTrip(filter: $filter) {
      id
      tripName
      destination
      budget
      date
      tag
      description
      isRequiredRiskAssessment
      userID
      Expenses {
        nextToken
        startedAt
      }
      Notes {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteTrip = /* GraphQL */ `
  subscription OnDeleteTrip($filter: ModelSubscriptionTripFilterInput) {
    onDeleteTrip(filter: $filter) {
      id
      tripName
      destination
      budget
      date
      tag
      description
      isRequiredRiskAssessment
      userID
      Expenses {
        nextToken
        startedAt
      }
      Notes {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      name
      email
      Trips {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      name
      email
      Trips {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      name
      email
      Trips {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
