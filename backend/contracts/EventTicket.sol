// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventTicket {

    struct Ticket {
        string eventName;
        address owner;
        bool verified;
    }

    mapping(string => Ticket) private tickets;
    mapping(string => bool) private exists;

    event TicketCreated(string ticketHash, string eventName, address owner);
    event TicketVerified(string ticketHash);

    function createTicket(
        string memory _ticketHash,
        string memory _eventName,
        address _owner
    ) public {
        require(!exists[_ticketHash], "Ticket already exists");

        tickets[_ticketHash] = Ticket(_eventName, _owner, false);
        exists[_ticketHash] = true;

        emit TicketCreated(_ticketHash, _eventName, _owner);
    }

    function verifyTicket(string memory _ticketHash) public returns (bool) {
        require(exists[_ticketHash], "Ticket does not exist");
        require(!tickets[_ticketHash].verified, "Already verified");

        tickets[_ticketHash].verified = true;

        emit TicketVerified(_ticketHash);
        return true;
    }

    function isVerified(string memory _ticketHash) public view returns (bool) {
        require(exists[_ticketHash], "Ticket does not exist");
        return tickets[_ticketHash].verified;
    }
}
