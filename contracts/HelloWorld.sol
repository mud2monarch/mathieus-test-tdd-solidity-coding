// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HelloWorld {
    bytes32 text;
    address public owner;

    constructor() {
        text = bytes32("Hello World!");
        owner = msg.sender;
    }

    // can't I just make the 'text' variable public?
    function helloWorld() external view returns(bytes32) {
        return text;
    }

    function transferOwnership (address _newOwner) external {
        require(msg.sender == owner, "Caller is not the owner");
        owner = _newOwner;
    }

    function changeText (string calldata _newText) external {
        require(msg.sender == owner, "Caller is not the owner");
        text = bytes32(abi.encodePacked(_newText));
    }

}