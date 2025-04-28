// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Candidate {
        string name;
        string party;
        uint256 voteCount;
        bool isActive;
    }
    
    struct Voter {
        bool hasVoted;
        uint256 votedFor;
        bool isRegistered;
        bytes32 zkProofHash;
    }
    
    address public admin;
    mapping(address => Voter) public voters;
    Candidate[] public candidates;
    bool public votingOpen;
    uint256 public totalVoters;
    uint256 public totalVotes;
    
    event CandidateAdded(string name, string party);
    event VoterRegistered(address voter);
    event Voted(address indexed voter, uint256 indexed candidateId);
    event VotingStatusChanged(bool isOpen);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    modifier votingIsOpen() {
        require(votingOpen, "Voting is not open");
        _;
    }

    modifier onlyRegisteredVoter() {
        require(voters[msg.sender].isRegistered, "Voter is not registered");
        _;
    }
    
    constructor() {
        admin = msg.sender;
        votingOpen = false;
        totalVoters = 0;
        totalVotes = 0;
    }
    
    function addCandidate(string memory _name, string memory _party) public onlyAdmin {
        candidates.push(Candidate({
            name: _name,
            party: _party,
            voteCount: 0,
            isActive: true
        }));
        emit CandidateAdded(_name, _party);
    }

    function registerVoter(address _voter, bytes32 _zkProofHash) public onlyAdmin {
        require(!voters[_voter].isRegistered, "Voter already registered");
        voters[_voter] = Voter({
            hasVoted: false,
            votedFor: 0,
            isRegistered: true,
            zkProofHash: _zkProofHash
        });
        totalVoters++;
        emit VoterRegistered(_voter);
    }
    
    function startVoting() public onlyAdmin {
        require(!votingOpen, "Voting is already open");
        votingOpen = true;
        emit VotingStatusChanged(true);
    }
    
    function stopVoting() public onlyAdmin {
        require(votingOpen, "Voting is already closed");
        votingOpen = false;
        emit VotingStatusChanged(false);
    }
    
    function vote(uint256 _candidateId, bytes32 _proofVerification) public votingIsOpen onlyRegisteredVoter {
        require(!voters[msg.sender].hasVoted, "Voter has already voted");
        require(_candidateId < candidates.length, "Invalid candidate ID");
        require(candidates[_candidateId].isActive, "Candidate is not active");
        require(voters[msg.sender].zkProofHash == _proofVerification, "Invalid vote proof");
        
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedFor = _candidateId;
        candidates[_candidateId].voteCount++;
        totalVotes++;
        
        emit Voted(msg.sender, _candidateId);
    }
    
    function getCandidateCount() public view returns (uint256) {
        return candidates.length;
    }
    
    function getCandidate(uint256 _candidateId) public view returns (
        string memory name,
        string memory party,
        uint256 voteCount,
        bool isActive
    ) {
        require(_candidateId < candidates.length, "Invalid candidate ID");
        Candidate memory candidate = candidates[_candidateId];
        return (
            candidate.name,
            candidate.party,
            candidate.voteCount,
            candidate.isActive
        );
    }

    function getVotingStats() public view returns (
        uint256 _totalVoters,
        uint256 _totalVotes,
        bool _isOpen
    ) {
        return (totalVoters, totalVotes, votingOpen);
    }

    function deactivateCandidate(uint256 _candidateId) public onlyAdmin {
        require(_candidateId < candidates.length, "Invalid candidate ID");
        candidates[_candidateId].isActive = false;
    }

    function reactivateCandidate(uint256 _candidateId) public onlyAdmin {
        require(_candidateId < candidates.length, "Invalid candidate ID");
        candidates[_candidateId].isActive = true;
    }
}
