package com.ssafy.sos.game.service;

import com.ssafy.sos.game.domain.Room;

import java.util.Deque;
import java.util.HashMap;

public interface GameService {
    int[] setPirateTreasure(String gameId);
    int initPirateStart(String gameId, int selectedNode);
    int initPirateRandomStart(String gameId);
    HashMap<Integer, Deque<Integer>> findPirateAvailableNode(String gameId, int nodeNumber);
    int[] initMarineStart(String gameId, int MarineNumber, int selectedNode);
    int[] initMarineStartRandom(String gameId, int MarineNumber);
    HashMap<Integer, Deque<Integer>> findMarineAvailableNode(String gameId, int nodeNumber);
    boolean move(String gameId, int nodeNumber, int role);
    Room makeRoom(String nickname);
    Room enterRoom(String gameId, String nickname);
    boolean investigate(String gameId, int nodeNumber, int role);
    boolean arrest(String gameId, int nodeNumber);
}
