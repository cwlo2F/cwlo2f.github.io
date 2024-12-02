---
title: Educational Codeforces Round 172
description: "Educational Codeforces Round 172"
tags:
  - Problem-Solving
  - Codeforces
categories: Codeforces
date: 2024-12-03 02:00:00
---

# 콘테스트 시작 전

오랜만에 참가하는 Codeforces 콘테스트이다.
근 3년간 경쟁 프로그래밍을 했다가 쉬었다가를 반복하는 것 같다.

# 콘테스트 기록

A, C를 콘테스트 중 풀었다. D, E, F는 포기했다. 
B를 못 풀었는데, 끝나고 난 후 값 초기화에서 실수했다는 것을 찾아냈다.

|A|B|C|D|E|F|
|:---:|:---:|:---:|:---:|:---:|:---:|
|00:05|0|01:08||||

# 2042A Greedy Monocarp

동전이 많은 상자부터 동전의 개수를 합하였을 때 $k$보다 작거나 같은 것 중 가장 큰 값을 $x$라고 하면, 답은 $k - x$가 된다.

# 2042B Game with Colored Marbles

색 $x$에 대해,
* 구슬이 한 개 있다면, Alice는 이것을 가져갔을 때 2점을 얻는다.
* 구슬이 두 개 이상 있다면, Alice는 이 색의 구슬을 한 개 이상 가져가지만 모두 가질 수는 없다.
구슬이 한 개 있는 색 $x$의 개수의 홀짝성을 고려한다.

# 2042C Competitive Fishing
$m$에 대해, 각 물고기를 $[1, a_1], [a_1 + 1, a_2], \dots, [a_{m - 1} + 1, n]$으로 나누었다고 하자.
$i$번째 물고기를 Bob이 잡았다면 $s_i = 1$, Alice가 잡았다면 $s_i = -1$이라고 하자.
$A_k = \sum_{i = 1}^{k} s_i$라고 하자.
점수의 차를 다음과 같이 표현할 수 있다.
$$
\begin{align*}
\sum_{i = 1}^{n} s_i v_i &= \sum_{i = 1}^{a_1} s_i \cdot 0 + \sum_{i = a_1 + 1}^{a_2} s_i \cdot 1 + \cdots + \sum_{i = a_{m - 1} + 1}^{n} s_i \cdot (m - 1) \\
&= 0 \cdot (A_{a_1} - 0) + 1 \cdot (A_{a_2} - A_{a_1}) + \cdots + (m - 1) \cdot \left(\sum_{i = 1}^n s_i - A_{a_{m - 1}}\right) \\ 
&= (m - 1) \cdot \sum_{i = 1}^n s_i - A_{a_1} - A_{a_2} - \cdots - A_{a_{m - 1}} \\
&= (m - 1) \cdot \sum_{i = 1}^n s_i - \left( A_{a_1} + A_{a_2} + \cdots + A_{a_{m - 1}} \right).
\end{align*}
$$
각 $m$에 대해, 마지막 항 $\left( A_{a_1} + A_{a_2} + \cdots + A_{a_{m - 1}} \right)$은 각 $A_{a_j}$를 가장 작은 것부터 선택했을 때 최소가 된다. 
점화식 $A_{i+1} = A_{i} + s_{i + 1}$을 사용하여 각 $A_i$를 계산하고 정렬하면 
각 $m$에 대해 점수 차의 최댓값을 계산할 수 있다.