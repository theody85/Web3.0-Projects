// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint votes;
    }

    Candidate[] private candidates;
    mapping(address => bool) private hasVoted;
    uint private candidatesNum;

    // Adds New Candidate
    function addCandidate(string memory _name) public {
        candidatesNum++;

        candidates.push(Candidate(candidatesNum, _name, 0));
    }

    // Removes Already Added Candidate
    function removeCandidate(uint candidateId) public {
        require(candidatesNum > 0, "There are no candidates added");
        require(
            candidateId > 0 && candidateId <= candidatesNum,
            "Invalid id provided"
        );

        candidates[candidatesNum - 1].id = candidates[candidateId - 1].id;
        candidates[candidateId - 1] = candidates[candidatesNum - 1];

        candidates.pop();
        candidatesNum--;
    }

    // Retrieves All Candidates for Viewing
    function getAllCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    // Allows Voter to Cast a Vote for a Single Candidate
    function castVote(uint candidateId) public {
        require(!hasVoted[msg.sender], "You have already voted");
        require(
            candidateId > 0 && candidateId <= candidatesNum,
            "Invalid id provided"
        );

        candidates[candidateId - 1].votes++;
        hasVoted[msg.sender] = true;
    }
}
