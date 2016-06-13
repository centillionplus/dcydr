# Project Name

DCYDR will allow your group to make a decision, quickly and easily.

## Team

  - __Product Owner__: Joel
  - __Scrum Master__: Mario
  - __Development Team Member__: Ruth

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

A group is trying to decide whether or not to a do a particular thing (watch a particular movie, go out to dinner, etc.)

One person in the group goes to our site and sees View 1: Voting setup. They can incremenet or decrement the number of voters (the size of the group) at the top, then press the button to start the voting session.

The organizer is now see View 2: Voting session. Anyone who goes to the site at this time for the first time will also see View 2. Anyone who comes in can press the Yes or the No button once. Once it's pressed, the selected option will stay selected and the other option will be greyed out as indication of what they voted for. If at any time the cancel button is pressed by anyone, that voting session will be reset and anyone visiting the site will see View 1.

Once the vote count has reached the original number of voters set up by the organizer, everyone will see View 3 displaying the results. In order to reset for a new voting session they would need to press the cancel button, the same as before.

NOTE ON MVP: Anyone who visits our site will see the current group's session.  Therefore in our first iteration only one group can be using the site at a time.

## Requirements

- Node
- Express
- Angular

## Development

### Installing Dependencies

From within the root directory:

```
npm install
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


### User Views

You can see the UX/UI sketches of views 1, 2, and 3 here:
https://drive.google.com/file/d/0ByfR6UjPYbmhSTcweVJaNjRwcWs/view?usp=sharing

- NOTE: The numbers indicated by each UI component reference the numbers listed in the Architecture sketch, listed below.


### Architecture

You can see the sketch of our client and server (and how they interact with each other) here:
https://drive.google.com/file/d/0ByfR6UjPYbmhaS02R01OZEVsLW8/view?usp=sharing


## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
