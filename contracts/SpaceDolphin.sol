// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract SpaceDolphin is ERC20Burnable {
    address payable public immutable owner;
    uint256 private constant INITIAL_SUPPLY = 299792000 * 1e18;

    constructor() ERC20("SpaceDolphin", "$DT") {
        owner = payable(msg.sender);
        _mint(owner, INITIAL_SUPPLY);
    }
}
