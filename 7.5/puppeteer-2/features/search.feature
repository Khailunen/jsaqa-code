Feature: Booking ticket

        
        Scenario: Booking ticket for tomorrow 'The witcher' at 17:00
         Given user selects a movie for tomorrow
         When user booking ticket for tomorrow "Ведьмак" at 17:00
         Then user has booked seat and sees his "Электронный билет"

        Scenario: Booking free places for 'Mickey Mouse' at 11:00'
         Given user selects a session after a week 
         When user booking tickets "Микки маус" at 11:00
         Then user has booked two tickets and sees a session on "Микки маус"

        Scenario: Booking occupied seats
        Given user selects a session after a week
        When user cannot book tickets "Микки маус" at 11:00
        Then user cannot receive the tickets because they are booked