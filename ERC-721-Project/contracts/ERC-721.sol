pragma solidity ^0.8.9;

interface IERC721Receiver {
    function onERC721Received(
        address operator,
        address from,
        uint tokenId,
        bytes calldata data
    ) external returns (bytes4);
}

contract ERC721 {
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 indexed _tokenId
    );

    event Approval(
        address indexed _owner,
        address indexed _approved,
        uint256 indexed _tokenId
    );

    event ApprovalForAll(
        address indexed _owner,
        address indexed _operator,
        bool _approved
    );

    mapping(address => uint256) _balances;
    mapping(uint => address) _owners;
    mapping(address => mapping(address => uint)) _approvals;
    mapping(address => mapping(address => bool)) _operators;

    function balanceOf(address _owner) external view returns (uint256) {
        require(_owner != address(0), "Invalid address");

        return _balances[_owner];
    }

    function ownerOf(uint256 _tokenId) external view returns (address) {
        require(_owners[_tokenId] != address(0), "Invalid address");

        return _owners[_tokenId];
    }

    function isContract(address _addr) internal view returns (bool) {
        uint codeSize;

        assembly {
            codeSize := extcodesize(_addr)
        }
        return codeSize > 0;
    }

    function isAprovedOrOwner(
        address _owner,
        address _spender,
        uint _tokenId
    ) internal view returns (bool) {
        return (_spender == _owner ||
            _operators[_owner][_spender] ||
            _approvals[_owner][_spender] == _tokenId);
    }

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId,
        bytes memory data
    ) external payable {
        require(_owners[_tokenId] != address(0), "Invalid token");
        require(_owners[_tokenId] == _from, "Unauthorised access!");
        require(
            isAprovedOrOwner(_from, msg.sender, _tokenId),
            "Unauthorised access!"
        );
        require(_to != address(0), "Invalid address");

        //Perform transaction
        _owners[_tokenId] = _to;
        _balances[_from]--;
        _balances[_to]++;

        emit Transfer(_from, _to, _tokenId);

        if (isContract(_to)) {
            bytes4 returnValue = IERC721Receiver(_to).onERC721Received(
                msg.sender,
                _from,
                _tokenId,
                data
            );
            require(
                returnValue ==
                    bytes4(
                        keccak256(
                            "onERC721Received(address,address,uint256,bytes)"
                        )
                    ),
                "Invalid return value"
            );
        }
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external payable {
        require(_owners[_tokenId] != address(0), "Invalid token");
        require(_owners[_tokenId] == _from, "Unauthorised access!");
        require(
            isAprovedOrOwner(_from, msg.sender, _tokenId),
            "Unauthorised access!"
        );
        require(_to != address(0), "Invalid address");

        _owners[_tokenId] = _to;
        _balances[_from]--;
        _balances[_to]++;

        emit Transfer(_from, _to, _tokenId);
    }

    function approve(address _approved, uint256 _tokenId) external payable {}

    function setApprovalForAll(address _operator, bool _approved) external {}

    function getApproved(uint256 _tokenId) external view returns (address) {}

    function isApprovedForAll(
        address _owner,
        address _operator
    ) external view returns (bool) {}
}
