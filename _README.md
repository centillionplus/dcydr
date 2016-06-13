# Project Name

> Pithy project description

## Team

  - __Product Owner__: teamMember
  - __Scrum Master__: teamMember
  - __Development Team Members__: teamMember, teamMember

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 0.10.x
- Redis 2.6.x
- Postgresql 9.1.x
- etc
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)

## Feature List

  UI Features:

    -All Views
      -Name of App - Header

    -View 1
      - Voting instruction - “How many  people need to vote”
      -Counter - Keep track of number of voters
        -Decrementer
        -Incrementer
        -Display Current Count
      -Go Button - Start Voting - Route to next view if already on the site, defaults View 2 to newcomers
        -post # of voters


    -View 2
      -Yes Button 
    -Counts a Yes Vote
      - post vote
      -Some feedback - highlight button, message, something
    -No Button
      -Counts a No Vote
      - post vote
    -Some feedback - highlight button, message, something
    -Cancel Button or Text
      -ask for confirmation(confirm)
      -Route back to View 1
      -Only for original User(optional)
      -Scraps votes
      - post cancel

    -View 3
      -”The group votes:” show result of vote (Yes, No, Tie)
      -Done Button - goes back to View 1 after confirmation(confirm)
        - post done

  Server:
  
    -serve static files: html, css, any assets
    -Keep track of votes - 
    -Know number of voters
    -Calculate results
    -handle get and post
      - respond to get with state (view 1, view 2, view 3) and results when ready
      - respond to get with # voters (optional)
      - respond to post vote 301
        - tally vote
      - respond to post  cancel / done
        -scrap votes


## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
