from datetime import datetime

match_date = datetime.today().strftime("%a,%b %-d")

print("Olampik 1 Results:")
print("---------------------------")
first_team_gols = int(input("Goals:"))
first_team_record = ''
gol = 1
while gol <= first_team_gols:
    record = input(f"Who score goals:")
    num_gols = int(input(f"How many goal scored by {record} :"))
    if num_gols == 1 :
        time = input (f"Time of scoring {gol} :")
        first_team_record += f"<p> {record} {time}' </p>"
        gol += 1
    else:
        time = "("
        for i in range (1,num_gols):
            t = input(f"Time of scoring goal {i} by {record} :")
            time += f"{t}' ,"
        t = input(f"Time of scoring goal {num_gols} by {record} :")
        time += f"{t}' "
        time += ")"
        first_team_record += f"<p> {record} {time} </p>"
        gol += num_gols

print("-----------------------------------------------------------------")

print("Second of first Olampik 2: ")
print("---------------------------")
second_team_gols = int(input("Goals:"))
second_team_record = ''
gol = 1
while gol <= second_team_gols :
    record = input(f"Who score goals:")
    num_gols = int(input(f"How many goal scored by {record} :"))
    if num_gols == 1 :
        time = input (f"Time of scoring goal {gol} by {record} :")
        second_team_record += f"<p> {record} {time}' </p>"
        gol += 1
    else:
        time = "("
        for i in range (1,num_gols):
            t = input(f"Time of scoring goal {i} by {record} :")
            time += f"{t}' ,"
        t = input(f"Time of scoring goal {num_gols} by {record} :")
        time += f"{t}' "
        time += ")"
        second_team_record += f"<p> {record} {time} </p>"
        gol += num_gols

# add To widget

with open("./widget.html","r") as widget:
    with open("./result.html","w") as result:
        txt = widget.read()
        # add goals 
        index_first_result = txt.find("goals") + 7
        index_second_result = txt.find("goals",index_first_result) + 7
        # add time
        index_of_time = txt.find("matchtime") + 11
        # add recoders 
        index_first_recoders = txt.find("record") + 8
        index_second_recoders = txt.find("record",index_first_recoders) + 8
        # collect all
        result.write(f"{txt[:index_first_result]} {first_team_gols} {txt[index_first_result:index_of_time]}  {match_date} {txt[index_of_time:index_second_result]}  {second_team_gols} {txt[index_second_result:index_first_recoders]} {first_team_record} {txt[index_first_recoders:index_second_recoders] } {second_team_record} {txt[index_second_recoders:]}")
