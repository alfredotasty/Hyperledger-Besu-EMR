// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0;

contract Profile {
    string name;
    string bloodGroup;
    string birthDate;
    string[] allowList;
    string owner;
    string[] records;

    function setOwner(string memory _owner) public {
        owner = _owner;
        allowList.push(owner);
    }

    function setName(string memory _name, string memory _key) public {
        if (inAllowList(_key)) {
            name = _name;
        }
    }

    function getName(string memory _key) public view returns (string memory) {
        if (inAllowList(_key)) {
            return name;
        }
        return "Not allow to access";
    }

    function setBlood(string memory _blood, string memory _key) public {
        if (inAllowList(_key)) {
            bloodGroup = _blood;
        }
    }

    function getBlood(string memory _key) public view returns (string memory) {
        if (inAllowList(_key)) {
            return bloodGroup;
        }
        return "Not allow to access";
    }

    function setBirthDate(string memory _birthDate, string memory _key) public {
        if (inAllowList(_key)) {
            birthDate = _birthDate;
        }
    }

    function getBirthDate(string memory _key)
        public
        view
        returns (string memory)
    {
        if (inAllowList(_key)) {
            return birthDate;
        }
        return "Not allow to access";
    }

    function isOwner(string memory _key) public view returns (bool) {
        if (
            keccak256(abi.encodePacked(owner)) ==
            keccak256(abi.encodePacked(_key))
        ) {
            return true;
        }
        return false;
    }

    function getAllowList(string memory _key)
        public
        view
        returns (string[] memory _result)
    {
        if (isOwner(_key)) {
            return allowList;
        }
    }

    function inAllowList(string memory _key) public view returns (bool) {
        for (uint256 i = 0; i < allowList.length; i++) {
            if (
                keccak256(abi.encodePacked(allowList[i])) ==
                keccak256(abi.encodePacked(_key))
            ) {
                return true;
            }
        }

        return false;
    }

    function addAllowList(string memory keyToAdd, string memory addBy)
        public
        returns (bool)
    {
        if (isOwner(addBy)) {
            allowList.push(keyToAdd);
            return true;
        }
        return false;
    }

    function find(string memory keyToRemove) public returns (uint256) {
        uint256 i = 0;
        while (
            keccak256(abi.encodePacked(allowList[i])) !=
            keccak256(abi.encodePacked(keyToRemove))
        ) {
            i++;
        }
        return i;
    }

    function remove(uint256 index) public {
        allowList[index] = allowList[allowList.length - 1];
        allowList.pop();
    }

    function removeAllowList(string memory keyToRemove, string memory removeBy)
        public
        returns (bool)
    {
        if (isOwner(removeBy)) {
            uint256 i = find(keyToRemove);
            remove(i);
            return true;
        }
        return false;
    }

    function addRecord(string memory addBy, string memory record) public {
        if (inAllowList(addBy)) {
            records.push(record);
        }
    }

    function getRecord(string memory _key)
        public
        view
        returns (string[] memory _result)
    {
        if (inAllowList(_key)) {
            return records;
        }
    }
}
