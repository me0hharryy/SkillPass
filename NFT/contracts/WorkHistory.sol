// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract WorkHistory {
    struct WorkEntry {
        string title;
        string description;
        string company;
        uint256 timestamp;
    }

    mapping(address => WorkEntry[]) private histories;

    event WorkAdded(address indexed user, string title, string company);

    function addWork(
        string memory _title,
        string memory _description,
        string memory _company
    ) external {
        WorkEntry memory entry = WorkEntry({
            title: _title,
            description: _description,
            company: _company,
            timestamp: block.timestamp
        });

        histories[msg.sender].push(entry);
        emit WorkAdded(msg.sender, _title, _company);
    }

    function getWorkHistory(address user) external view returns (WorkEntry[] memory) {
        return histories[user];
    }
}