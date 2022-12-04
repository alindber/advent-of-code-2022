interface Pair {
  left: { start: number; end: number };
  right: { start: number; end: number };
}

export const day4 = () => {
  console.log("****** Day 4 ******************");

  const pairs: Pair[] = input.split("\n").map((line) => {
    const [leftRange, rightRange] = line.split(",");
    const [leftStart, leftEnd] = leftRange
      .split("-")
      .map((n) => parseInt(n, 10));
    const [rightStart, rightEnd] = rightRange
      .split("-")
      .map((n) => parseInt(n, 10));
    return {
      left: { start: leftStart, end: leftEnd },
      right: { start: rightStart, end: rightEnd },
    };
  });

  const fullyOverlappingPairs = pairs.filter((pair) => {
    const left = pair.left;
    const right = pair.right;
    return (
      (left.start >= right.start && left.end <= right.end) ||
      (right.start >= left.start && right.end <= left.end)
    );
  });
  console.log(
    `Part 1 - Number of Full Overlaps: ${fullyOverlappingPairs.length}`
  );

  const partiallyOverlappingPairs = pairs.filter((pair) => {
    const left = pair.left;
    const right = pair.right;
    return (
      (left.start >= right.start && left.start <= right.end) ||
      (right.start >= left.start && right.start <= left.end)
    );
  });
  console.log(
    `Part 2 - Number of Partial Overlaps: ${partiallyOverlappingPairs.length}`
  );

  console.log("*******************************");
};

const input = `20-45,13-44
7-8,8-28
3-39,14-97
35-99,35-98
18-49,17-19
33-34,34-46
46-58,58-75
4-93,25-97
92-99,7-91
61-62,24-61
35-62,34-63
85-87,3-86
9-49,7-48
5-87,87-95
3-3,3-82
13-63,25-62
4-99,1-98
72-80,74-77
9-96,95-97
50-68,51-76
34-80,33-33
37-98,21-37
9-71,10-72
40-94,39-94
1-88,88-92
46-47,46-51
14-59,14-60
69-99,22-95
9-66,9-65
62-69,64-69
6-40,16-70
58-97,9-82
12-56,12-46
71-85,25-70
70-86,86-97
47-70,46-69
11-65,65-66
56-58,57-85
33-66,33-65
67-67,10-67
21-55,20-22
15-72,15-71
19-92,45-93
38-82,38-83
23-90,90-90
96-98,5-97
33-38,32-33
42-42,26-41
31-92,30-93
22-58,4-47
3-49,49-59
29-61,11-12
5-81,4-81
68-91,67-92
6-87,5-86
73-73,59-74
16-70,26-31
25-58,24-67
2-47,47-54
5-73,4-74
58-98,1-99
7-94,95-97
11-63,11-12
25-54,53-55
90-94,93-95
6-61,7-62
47-63,27-62
30-46,47-47
67-94,94-95
60-95,95-96
35-83,83-84
20-82,19-82
28-29,28-88
32-45,46-66
55-78,79-79
21-55,20-21
8-10,11-98
21-71,20-20
18-19,19-21
23-76,24-76
22-96,23-95
66-97,66-98
89-91,25-90
21-64,21-26
77-80,77-86
32-89,24-88
37-93,36-36
33-59,60-98
7-91,6-7
2-86,2-56
85-97,86-96
80-80,42-80
16-87,27-86
4-94,5-93
34-37,36-38
6-92,3-6
22-85,21-21
9-9,9-92
31-87,31-86
58-98,97-99
1-98,1-87
6-66,5-67
27-54,28-55
6-27,12-38
22-29,4-28
19-19,20-88
64-98,64-85
6-97,6-86
13-72,72-73
6-12,12-75
11-34,10-16
18-89,7-18
9-67,3-9
5-6,5-46
45-53,53-56
48-95,14-50
93-99,4-93
19-35,20-35
22-77,21-78
13-71,12-71
24-39,23-39
64-78,15-65
11-41,10-11
49-75,3-76
40-87,87-99
42-44,17-43
37-94,28-93
56-58,53-57
98-98,3-98
13-72,12-73
39-86,40-86
18-18,19-37
24-89,25-64
45-71,44-71
7-69,8-69
6-87,1-88
45-88,44-45
83-96,78-95
7-65,64-73
11-96,8-97
32-52,14-31
40-94,40-93
12-17,8-18
27-43,28-42
37-95,10-95
22-93,20-23
37-84,36-85
3-98,98-98
25-92,1-81
68-73,56-74
75-78,72-89
31-80,80-80
33-85,56-86
7-98,4-99
25-52,51-66
80-87,1-80
7-99,2-8
14-56,13-13
32-52,33-98
33-87,33-87
33-98,34-75
52-53,52-75
1-6,5-20
65-98,82-86
9-99,4-98
19-60,11-12
3-77,4-82
18-78,18-88
3-7,7-99
17-89,17-90
61-94,26-87
51-73,51-73
30-87,30-30
6-67,19-66
2-86,2-98
20-82,19-20
39-82,38-88
4-95,4-98
5-46,33-46
4-66,1-3
5-97,6-98
2-91,91-91
7-93,8-92
26-62,25-67
35-37,36-36
3-98,1-3
31-69,32-68
2-2,4-46
94-96,1-95
32-46,31-45
2-55,1-54
31-91,32-90
25-62,26-61
22-30,32-94
57-96,55-95
1-13,3-95
18-70,18-78
2-2,2-98
8-50,49-62
37-65,7-38
18-47,32-48
12-55,12-86
2-6,2-94
1-98,98-98
1-23,5-72
38-52,39-54
40-40,41-96
88-89,16-88
22-32,21-33
39-84,85-87
18-19,18-92
21-99,6-84
54-56,29-55
12-23,22-91
38-43,36-42
8-68,31-73
5-82,5-92
45-66,41-66
61-70,60-83
58-70,13-58
47-57,48-56
66-91,65-74
69-69,30-69
10-91,11-91
76-90,76-99
3-79,17-78
2-99,2-99
98-99,52-98
19-26,25-71
5-93,15-94
70-72,19-71
56-85,55-84
57-91,57-93
2-2,3-95
3-4,6-98
2-93,1-1
6-87,7-88
7-96,95-98
39-96,9-96
5-94,4-5
40-96,39-96
18-92,17-89
26-74,11-11
89-97,55-94
4-92,2-93
67-97,97-98
64-85,63-84
2-70,14-69
3-43,3-6
4-70,4-4
11-12,12-80
20-34,35-54
30-47,9-46
11-95,46-94
32-94,33-93
97-98,96-98
4-11,3-13
1-1,3-53
6-90,90-91
34-79,8-80
57-92,57-93
45-45,3-45
35-53,35-52
6-28,5-29
9-81,81-81
71-72,71-92
20-50,18-72
17-74,1-17
38-73,14-73
62-85,13-71
47-68,47-68
27-72,26-73
7-89,88-90
97-99,8-97
37-92,36-36
39-79,40-67
1-89,1-88
20-71,19-19
11-83,10-83
37-37,8-37
88-95,13-87
36-59,18-58
52-84,64-85
12-78,11-77
42-82,47-83
34-95,35-95
63-88,11-64
62-70,58-60
45-92,45-86
13-99,12-98
6-7,8-8
7-97,97-98
48-48,1-48
74-80,75-79
98-98,7-97
69-80,69-79
18-59,18-59
15-73,15-74
55-79,55-78
59-67,58-67
7-95,8-95
71-77,78-78
3-52,3-53
15-54,8-46
21-39,21-50
34-61,9-34
69-69,70-70
3-27,1-2
19-65,19-64
22-99,7-98
21-50,51-86
4-96,14-95
6-83,83-84
30-30,31-76
21-49,48-50
4-7,9-82
20-89,13-20
22-40,23-39
94-95,6-93
2-3,3-74
54-81,37-82
18-91,17-91
29-77,78-92
16-73,73-73
25-78,43-54
39-39,37-58
52-94,52-53
18-50,8-13
3-3,3-99
96-99,1-96
36-37,35-36
3-25,7-81
29-48,14-49
96-98,3-97
25-95,96-97
14-96,1-8
72-80,80-80
51-88,29-50
24-64,19-63
28-66,29-52
14-97,13-14
52-53,53-98
11-63,12-64
30-63,22-64
18-25,16-18
21-54,21-88
87-88,32-88
19-87,17-17
55-65,20-66
44-45,45-87
55-61,54-55
26-27,26-98
50-64,32-75
33-95,33-33
7-98,98-99
19-35,18-18
78-99,12-79
11-13,14-99
5-98,4-5
52-72,51-53
49-97,17-96
14-95,13-94
20-84,5-19
90-90,66-90
19-57,30-52
21-89,89-91
59-60,24-59
66-75,17-67
53-53,54-97
48-89,49-88
57-63,1-64
2-3,2-98
15-98,1-97
39-46,39-81
71-72,60-71
53-96,53-97
3-74,4-73
58-93,58-93
3-64,1-1
47-72,42-44
32-82,82-83
40-41,7-40
7-22,8-23
96-99,39-95
89-90,3-89
7-95,95-98
23-60,24-59
5-24,24-59
5-45,4-44
9-9,9-94
18-42,41-91
51-53,61-68
14-79,7-78
47-93,8-47
5-97,5-97
10-98,9-99
6-81,7-80
32-37,36-60
9-77,9-78
18-43,17-17
91-96,2-68
36-92,30-91
16-36,2-11
6-74,62-95
6-97,7-98
78-79,31-78
56-90,90-91
9-38,2-10
9-56,28-45
17-77,16-76
18-18,18-93
8-65,8-63
78-82,28-83
5-80,6-53
24-32,23-68
7-39,8-94
41-86,86-94
62-64,59-64
45-93,45-86
83-86,30-92
32-80,11-33
16-97,17-97
4-84,85-85
3-99,3-4
83-83,16-83
30-75,71-76
17-82,81-89
43-56,28-55
1-49,48-49
13-53,12-53
3-13,27-76
32-65,32-82
17-92,92-92
77-81,10-79
36-85,96-97
1-2,1-95
66-90,66-89
7-37,7-50
13-92,13-80
32-96,31-96
13-52,10-53
61-83,1-60
29-55,12-30
78-80,4-79
1-1,6-66
3-8,9-83
2-81,1-94
27-43,27-43
16-17,17-98
6-9,8-43
38-78,39-78
20-99,13-92
36-93,52-92
3-10,11-74
69-74,8-69
27-43,28-36
20-77,19-76
24-86,18-85
13-44,45-78
6-27,7-26
7-42,2-6
73-75,5-74
19-24,23-37
23-71,36-99
3-99,15-98
5-98,3-3
4-62,3-62
2-18,1-99
3-95,7-96
37-63,43-68
60-71,54-59
28-35,34-88
68-80,67-81
77-89,76-88
22-48,23-48
95-96,66-95
17-64,18-48
69-88,18-74
96-98,39-97
8-45,45-45
7-18,19-89
32-42,12-41
76-80,52-76
45-93,46-94
1-97,3-97
71-82,70-83
46-47,28-46
10-11,12-91
23-24,24-99
36-65,36-65
96-98,11-95
47-57,47-56
5-11,10-99
39-56,38-55
62-97,61-61
19-99,99-99
93-93,13-92
72-74,73-78
87-92,80-91
95-95,18-95
87-88,12-87
41-86,85-91
1-1,3-42
20-94,20-62
1-68,1-1
2-97,1-98
25-63,63-64
1-3,3-99
28-29,29-38
34-87,54-88
69-69,64-69
24-53,37-54
9-79,8-79
22-69,23-68
44-51,44-81
9-94,5-8
11-93,93-94
9-17,7-16
63-63,6-62
45-91,13-60
13-97,12-12
9-33,8-8
25-26,26-39
25-83,25-84
9-73,73-89
20-76,20-84
69-78,2-68
5-46,4-47
25-32,29-35
90-94,16-90
74-80,77-80
46-52,52-76
45-48,12-48
61-62,26-61
8-99,2-9
4-95,4-96
60-92,59-93
30-51,30-31
21-88,16-18
11-89,12-90
46-46,2-45
4-99,2-36
39-47,40-48
42-78,54-55
7-86,7-87
9-99,2-98
21-94,22-60
11-99,11-96
13-57,43-56
13-48,49-79
93-95,3-94
31-80,30-80
16-75,74-76
53-56,54-60
5-53,53-54
53-53,52-52
8-91,9-92
26-65,16-65
65-67,59-74
52-52,26-52
15-43,14-44
58-58,57-70
77-99,78-98
90-90,76-92
36-50,35-77
7-36,8-35
36-91,37-93
3-41,2-2
94-95,59-94
6-86,6-86
3-83,2-3
49-66,65-67
43-71,71-97
9-10,10-75
4-80,80-80
32-67,8-66
46-47,34-47
85-94,6-96
33-35,18-34
6-55,5-55
2-74,74-74
52-94,52-53
20-93,3-31
90-92,90-93
20-52,51-53
97-98,10-97
4-84,2-85
22-93,93-94
53-88,54-89
9-30,19-37
5-39,38-39
50-90,13-91
81-94,80-93
18-86,19-29
1-81,18-80
85-95,23-86
77-78,77-95
28-87,27-27
24-25,25-94
4-93,2-92
1-92,2-93
17-35,35-49
2-3,2-52
46-46,37-46
10-94,9-95
5-57,6-57
14-89,34-90
13-13,14-68
37-67,36-92
35-92,8-34
7-49,7-50
33-95,9-92
28-29,27-78
83-84,12-83
6-34,6-93
9-56,9-56
2-29,2-10
11-11,12-88
24-58,16-25
95-99,28-95
90-92,31-91
15-35,15-36
31-84,19-63
3-50,64-93
31-94,30-93
7-89,7-8
27-62,8-49
20-87,21-64
56-70,56-93
1-37,37-37
19-85,84-86
18-20,19-79
23-74,20-63
5-93,6-92
6-73,4-74
86-91,85-98
13-21,21-36
60-94,59-59
33-50,49-51
25-58,18-52
94-94,34-94
50-55,50-50
1-96,1-29
19-99,20-99
61-62,61-85
4-18,18-18
78-78,45-78
47-92,46-93
87-94,18-87
4-5,4-95
57-92,7-76
35-60,1-35
2-89,41-90
5-6,6-37
21-68,16-69
49-89,44-58
3-60,60-62
49-99,2-49
20-67,13-44
16-25,25-62
4-94,4-99
52-85,2-29
9-17,19-89
6-72,7-71
5-82,17-82
64-75,63-75
26-60,29-93
10-53,54-61
81-83,5-80
87-98,58-97
11-33,12-34
67-67,67-75
40-60,16-40
9-64,8-63
27-95,27-95
18-18,19-38
27-98,28-97
5-14,14-62
83-84,84-88
11-93,11-93
2-5,6-94
58-68,57-67
23-25,24-70
12-32,31-55
31-35,20-34
8-49,23-50
58-85,58-87
4-94,1-4
40-41,41-71
21-94,10-21
29-95,28-94
19-74,18-18
1-49,1-2
39-46,1-45
65-66,22-65
28-92,92-99
9-80,8-8
21-93,14-22
11-94,93-98
26-69,60-68
8-44,14-45
65-67,51-66
34-94,93-95
11-33,33-33
32-97,98-98
10-97,10-11
47-72,46-86
10-10,10-97
4-79,4-80
24-95,94-99
12-79,66-80
56-62,50-61
27-94,26-95
27-70,27-27
26-77,76-78
85-86,41-85
24-83,24-84
31-73,63-71
6-75,6-30
3-71,71-90
32-56,31-76
16-73,16-16
55-73,56-72
32-88,32-90
17-17,18-65
10-94,94-94
47-85,47-59
12-85,11-84
3-90,89-91
36-51,36-55
5-57,5-56
1-58,40-57
46-65,46-50
72-83,78-94
98-98,7-97
30-52,30-51
11-98,10-98
91-99,98-99
66-94,64-94
65-65,27-64
37-37,30-37
33-76,17-34
26-28,20-27
9-97,8-98
2-82,3-83
16-88,5-64
11-26,42-48
90-91,8-90
44-96,45-67
94-94,10-93
59-94,59-94
18-53,18-52
2-48,2-48
3-3,5-92
95-96,3-95
10-26,25-39
12-12,13-47
5-5,6-17
39-51,50-52
2-98,3-98
7-19,18-76
9-9,10-55
5-10,26-99
26-88,26-90
1-37,1-2
21-71,21-70
71-82,72-82
81-92,53-88
3-96,2-96
15-72,15-71
6-43,7-9
17-79,17-18
19-53,18-69
2-2,4-91
99-99,1-99
25-33,26-33
75-78,32-77
94-95,5-94
53-89,45-52
8-96,4-99
7-76,6-6
8-30,10-48
9-71,9-41
22-22,22-57
5-21,20-22
16-99,16-94
2-50,1-96
25-36,24-35
16-90,52-84
10-32,9-33
76-78,35-77
2-98,3-98
56-58,8-62
51-68,54-58
57-76,76-87
15-69,15-75
64-83,83-90
68-74,69-69
7-8,8-36
23-97,22-23
23-81,2-23
82-86,12-86
4-73,4-32
39-78,38-79
46-82,38-68
63-84,83-97
42-90,42-91
2-56,2-29
14-96,13-81
46-53,53-54
46-52,31-94
37-92,38-93
96-97,36-96
2-58,2-2
51-94,50-93
24-45,26-64
51-80,52-79
48-56,49-58
64-97,97-97
8-65,15-66
3-8,7-19
10-63,10-63
74-74,74-74
27-84,16-31
45-62,10-63
82-84,5-83
4-8,5-6
60-69,59-71
4-95,8-94
25-93,6-26
9-68,8-83
6-99,6-98
63-64,9-63
37-88,10-56
1-56,1-97
11-89,6-12
16-98,6-16
9-52,8-53
45-95,44-45
12-96,11-96
1-4,3-95
34-39,19-38
14-90,13-89
58-83,58-81
25-91,13-92
49-79,70-80
14-92,91-93
26-48,17-47
24-96,25-96
41-66,47-52
26-37,26-38
2-89,3-90
12-56,12-55
21-49,21-49
29-68,28-67
95-96,76-94
20-65,19-19
11-70,10-11
21-92,22-93
15-90,11-89
1-92,1-1
66-91,14-90
64-73,1-98
39-39,39-45
62-86,61-86
16-89,89-90
19-95,7-89
67-90,50-90
63-96,4-62
3-74,2-74
72-80,71-81
56-65,56-82
93-93,79-92
24-87,1-23
31-35,40-64
4-97,3-3
45-45,45-72
65-66,42-65
42-95,41-94
3-4,3-94
14-88,88-89
28-83,28-89
51-79,27-64
14-18,14-17
7-97,5-6
18-34,35-35
1-99,9-99
33-54,43-54
11-42,32-43
2-30,1-29
6-88,7-88
45-50,37-53
39-84,37-83
34-51,27-73
21-52,16-53
2-6,4-7
15-46,4-47
49-50,1-50
39-80,10-38
23-59,24-58
21-72,22-72
22-73,73-74
25-47,26-48
4-98,5-99
3-3,3-91
21-98,22-99
14-33,32-32
14-20,13-24
19-92,5-88
90-98,90-99
29-60,60-61
3-71,10-92
7-22,7-92
8-37,7-7
16-88,17-88
29-71,30-72
44-85,84-86
70-72,49-71
41-80,41-55
32-32,33-69
2-55,3-55
73-73,74-95
16-71,6-72
41-80,40-79
33-40,27-34
21-96,96-98
22-22,23-38
30-93,31-92
16-20,19-71
22-99,98-99
5-82,5-71
33-45,32-34
65-77,76-84
72-76,10-73
2-4,4-16
24-68,23-23
43-59,42-58
15-59,16-59
8-85,2-8
84-86,5-85
9-82,8-82
1-6,6-86
65-76,65-75
3-60,4-59
76-85,51-84
3-65,4-16
2-97,1-96
2-4,6-85
18-91,91-92
42-43,42-91
25-96,24-26
7-92,92-93
29-61,6-28
5-5,5-70
22-70,21-69
25-74,73-74
45-52,49-54
1-85,2-85
5-94,10-80
37-38,37-54
15-73,15-72
27-62,9-26
8-93,5-8
25-37,36-94
3-95,4-96
31-87,86-88
62-63,63-90
22-27,21-26
93-93,34-80
17-91,18-92
75-86,15-75
4-4,4-94
10-65,9-66
96-96,87-96
4-29,2-5
5-35,6-35
8-75,8-85
7-82,8-67
15-90,15-16
6-24,23-76
62-96,98-98
10-98,1-2
3-51,23-95
66-84,11-66
24-77,23-95
52-91,43-46
10-96,11-96
45-47,46-48
10-83,2-10
62-62,62-99
34-71,70-91
38-65,39-64
33-68,34-69
2-96,1-97
24-51,52-82
88-94,89-94
23-23,24-87
13-31,31-84
63-65,2-64
42-91,42-73`;
