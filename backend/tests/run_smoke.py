from app import create_app

app = create_app('testing')
client = app.test_client()

assert client.get('/').status_code == 200
assert client.get('/api/leaderboard/top10').status_code == 200
print('smoke tests passed')
