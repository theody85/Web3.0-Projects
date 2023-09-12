// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Voting.sol";

contract VotingFactory {
    address[] public deployedVotingContracts;

    function createVotingContract() public {
        Voting newVoting = new Voting();
        deployedVotingContracts.push(address(newVoting));
    }

    function getDeployedVotingContracts()
        public
        view
        returns (address[] memory)
    {
        return deployedVotingContracts;
    }
}
