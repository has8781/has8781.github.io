from itertools import product

import cx_Oracle
from PIL import Image
import numpy as np

import argparse
import json

# 오늘의 기온에 해당하는 score (임시로 배정함)
today_temp_score = 30
# 기온 score와 추천 조합 score 합의 오차 범위
temp_total_score = 60
temp_abs_score = 5

color_abs_score = 100
# -----------------------------------------------------------------------------------
parser = argparse .ArgumentParser (description ='파이썬 노드에서 돌리기 테스트')

#파서에 인수 추가 
parser .add_argument ('api', help ='api 주소')

# 프로그램 실행 시 제공된 인수를 파싱
args = parser .parse_args ()

#값 저장
api_value = args.api
today_temp_score = int(api_value)
# # -----------------------------------------------------------------------------------
# 옷 type별 temp_score 대응하는 딕셔너리
class_temp_dict = {'short_shirt' : 10,
                   'long_shirt' : 20,
                   'hood_shirt' : 30,
                   'short_pants' : 10,
                   'denim_pants' : 20,
                   'suit_pants' : 20,
                   'mini_skirt' : 10,
                   'long_skirt' : 20,
                   'maxi_dress' : 30,
                   'mini_dress' : 20,
                   'hooded_zipup' : 10,
                    'cardigun' :15,
                    'long_padding' : 20,
                    'short_padding' : 15,
                    'fleece' : 15}

# 상, 하의 분류 딕셔너리(후에 추가적으로 외투 등 분류)
clothes_classfication_dict = {'top' : ['short_shirt','long_shirt','hood_shirt'],
                              'pants' : ['short_pants','denim_pants','suit_pants','mini_skirt','long_skirt'],
                              'dress' : ['maxi_dress','mini_dress'],
                              'outer' : ['hooded_zipup', 'cardigun','long_padding','short_padding', 'fleece']
                              }

# 내 옷 상, 하의 분류
my_clothes_classfication_dict = {'top' : [],
                                 'pants' : [],
                                 'dress' : [],
                                 'outer' : []
                                 }

my_clothes = {}
# -------------------------------------------------------------------------------------------
# 텍스트 파일 (input_data)읽어서 my_clothes에 저장
# 형식 index : [옷 타입, 색상(RGB표 참조)]


con = cx_Oracle.connect("c##aiproject", "ai1234ai", "122.38.11.25:1521/XE")   # DB에 연결 (호스트이름 대신 IP주소 가능)
    # con = cx_Oracle.connect("c##aiproject", "ai1234ai", "122.38.11.25:1521/XE")   # DB에 연결 (호스트이름 대신 IP주소 가능)

cursor = con.cursor()

cursor.execute("select * from clothes")
out_data2 = cursor.fetchall()

for record in out_data2:
    # print(record)
    # clothes = list(record).strip().split(',')
    clothes = record
    #print(record)
    my_clothes[clothes[0]] = [clothes[2],clothes[1],clothes[3]]

# -------------------------------------------------------------------------------------------

# 특정 옷이 상의인지 하의인지 알기 위한 딕셔너리
reverse_clothes_classfication_dict = {}
for k, v in clothes_classfication_dict.items() :
    for i in v :
        reverse_clothes_classfication_dict[i] = k
# for k, v in reverse_clothes_classfication_dict.items() :
#     print(f'{k} : {v}')

# 내 옷 상, 하의 분류해서 저장
for k, v in my_clothes.items():
    my_clothes_classfication_dict[reverse_clothes_classfication_dict[v[0]]].append(k)
# for k, v in my_clothes_classfication_dict.items() :
#     print(f'{k} : {v}')

# -------------------------------------------------------------------------------------------
# 조합 

# a, b의 RGB중 하나라도 오차가 100이 넘으면 조합에서 제거
# 파라미터 a, b : ex) 153153204, 000102000
def RGB_abs(a, b) :
    a_list = [int(a[:3]), int(a[3:6]),int(a[6:])]
    b_list = [int(b[:3]), int(b[3:6]),int(b[6:])]
    for ai, bi in zip(a_list, b_list) :
        if abs(ai - bi) > color_abs_score :
            return False 
    return True

# 조합 결과 filtering
def temp_score_abs(clothes_Combination, case_result, is_one = False) :
    for case in case_result :
        score_sum = 0
        # if is_one :
        #     score_sum = class_temp_dict[my_clothes[list(case)[0]][0]]
        #     print(score_sum)
        # else :
        for i in list(case) :
            score_sum += class_temp_dict[my_clothes[i][0]]
        # 조합 결과중 기온 score와 조합 score 합의 오차가 5이하인 결과만 저장
        if abs((score_sum + today_temp_score) - temp_total_score) <= temp_abs_score:
            # 조합 결과중 RGB 값의 오차가 
            if len(case) >= 2 :
                if RGB_abs(my_clothes[list(case)[0]][1], my_clothes[list(case)[1]][1]) :
                    # clothes_Combination.append([case,abs(score_sum - today_temp_score)])
                    clothes_Combination.append([[my_clothes[case[0]][2],my_clothes[case[1]][2]]])
            else :
                clothes_Combination.append([my_clothes[case[0]][2]])



# -------------------------------------------------------------------------------------------
if __name__ == '__main__' :
    # 옷 조합 저장할 list
    clothes_Combination = []

    # 상, 하의 조합
    case_1 = [my_clothes_classfication_dict['top'],my_clothes_classfication_dict['pants']]
    case_1_result = list(product(*case_1))
    # print(case_1_result)
    temp_score_abs(clothes_Combination, case_1_result)

    case_2 = [my_clothes_classfication_dict['dress']]
    case_2_result = list(product(*case_2))
    # print(case_2_result)
    temp_score_abs(clothes_Combination, case_2_result, is_one = True)

    case_3 = [my_clothes_classfication_dict['top'],my_clothes_classfication_dict['pants'], my_clothes_classfication_dict['outer']]
    case_3_result = list(product(*case_3))
    # print(case_2_result)
    temp_score_abs(clothes_Combination, case_2_result, is_one = True)

    case_4 = [my_clothes_classfication_dict['dress'], my_clothes_classfication_dict['outer']]
    case_4_result = list(product(*case_4))
    # print(case_2_result)
    temp_score_abs(clothes_Combination, case_2_result, is_one = True)

    # 결과 출력
    #print(clothes_Combination)

    con.close()

# -------------------------------------------------------------------------------------------
   
# ---------------------------------------------------------------------------------------------------------------

    #의미 없는 2차원 배열 
    result = clothes_Combination

    # print(clothes_Combination)
    #result = "ABC"
    print(json.dumps({'api_value': api_value, 'result_array': result}))
    