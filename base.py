#Gerard Smetek
#s402288
import pygame
from random import randint
from Queue import PriorityQueue

# Kolory - definicja
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
YELLOW = (255, 255, 0)

# Wymiary blokow
WIDTH = 50
HEIGHT = 50
 
# Margines
MARGIN = 5
 
# Create a 2 dimensional array. A two dimensional
# array is simply a list of lists.
grid = []
weigth = []
for row in range(10):
    # Add an empty array that will hold each cell
    # in this row
    grid.append([])
    weigth.append([])
    for column in range(10):
        grid[row].append(0)  # Append a cell
        weigth[row].append(randint(0,9))       

# Set row 0, cell 0 to one. (Remember rows and
# column numbers start at zero.)
#Pozycja startowa
positionx=0
positiony=0
grid[positiony][positionx] = 1
direction = "S"

#node start - pojedynczy stan
node = []
nodeaddr=0
node.append([])
node[0].append(positionx)
node[0].append(positiony)
node[0].append(direction)

#nextstep
node = []
nodeaddr=0
node.append([])
node[0].append(positionx)
node[0].append(positiony)
node[0].append(direction)

#goalstate - sprawdzenie czy to jest koncowy
goalx= None
goaly= None
def goalstate(x,y):
	global goalx
	global goaly
	if x==goalx and y==goaly:
		return True
	return False

# Initialize pygame
pygame.init()
 
# Wielkosc okna
WINDOW_SIZE = [555, 555]
screen = pygame.display.set_mode(WINDOW_SIZE)
 
# Nazwa
pygame.display.set_caption("Pole pracy - SI")
 
# Font gry
pygame.font.init()
myfont = pygame.font.SysFont('Comic Sans MS', 30)
 
# Loop until the user clicks the close button.
done = False
 
# Used to manage how fast the screen updates
clock = pygame.time.Clock()

# Def poruszania sie
def move():
	global direction
	global positionx
	global positiony
	if direction == "N":
		if positiony > 0:
			grid[positiony][positionx] = 3
			positiony=positiony-1
			grid[positiony][positionx] = 1
	elif direction == "E":
		if positionx < 9:
			grid[positiony][positionx] = 3
			positionx=positionx+1
			grid[positiony][positionx] = 1
	elif direction=="W":
		if positionx > 0:
			grid[positiony][positionx] = 3
			positionx=positionx-1
			grid[positiony][positionx] = 1
	elif direction=="S":
		if positiony < 9:
			grid[positiony][positionx] = 3
			positiony=positiony+1
			grid[positiony][positionx] = 1
	if goalstate(positionx,positiony):
		print("Dotarles")
	return

# -------- Glowna czesc programu - loop -----------
while not done:
    for event in pygame.event.get():  # User did something
        if event.type == pygame.QUIT:  # If user clicked close
            done = True  # Flag that we are done so we exit this loop
        elif event.type == pygame.MOUSEBUTTONDOWN:
            if goalx==None:
				# User clicks the mouse. Get the position
				pos = pygame.mouse.get_pos()
				# Change the x/y screen coordinates to grid coordinates
				goalx = pos[0] // (WIDTH + MARGIN)
				goaly = pos[1] // (HEIGHT + MARGIN)
				# Set that location to one
				grid[goaly][goalx] = 2
				print("Click ", pos, "Koordynaty: ", row, column)
        elif event.type == pygame.KEYDOWN:
			if event.key == pygame.K_LEFT:
				if direction == "S":
					direction = "E"
				elif direction == "E":
					direction = "N"
				elif direction == "N":
					direction = "W"
				elif direction == "W":
					direction = "S"
				print("Click Key_LEFT, obrano kierunek: ", direction)
			if event.key == pygame.K_RIGHT:
				if direction == "S":
					direction = "W"
				elif direction == "W":
					direction = "N"
				elif direction == "N":
					direction = "E"
				elif direction == "E":
					direction = "S"
				print("Click Key_RIGHT, obrano kierunek: ", direction)
			if event.key == pygame.K_UP:
				move()
				print("Click Key_UP, ruch w strone: ", direction)
 
    # Set the screen background
    screen.fill(BLACK)
 
    # Draw the grid
    for row in range(10):
        for column in range(10):
            color = WHITE
            if grid[row][column] == 1:
                color = GREEN
            #cel
            if grid[row][column] == 2:
                color = RED
            #przebyte
            if grid[row][column] == 3:
                color = YELLOW
            pygame.draw.rect(screen,
                             color,
                             [(MARGIN + WIDTH) * column + MARGIN,
                              (MARGIN + HEIGHT) * row + MARGIN,
                              WIDTH,
                              HEIGHT])

            if grid[row][column] == 1:
				textsurface = myfont.render(direction, False, (0, 0, 0))
				screen.blit(textsurface,((column*55)+25,(row*55)+20))
	for row in range(10):
		for column in range(10):
			textsurface = myfont.render(str(weigth[row][column]), False, (0, 0, 0))
			screen.blit(textsurface,((column*55)+10,(row*55)+5))
 
    # Limit to 60 frames per second
    clock.tick(60)
 
    # Go ahead and update the screen with what we've drawn.
    pygame.display.flip()

# Be IDLE friendly. If you forget this line, the program will 'hang'
# on exit.
pygame.quit()
