//
//	Fire.js
//	Ascii art fire effect
//
//	Papadopoulos Nikos
//	Email: nikpapas[at]gmail[dot]com
//
//	Copyright 2010.
//	All rights reserved.
//
//
//	This program is free software; you can redistribute it and/or modify
//	it under the terms of the GNU Lesser General Public License as published by
//	the Free Software Foundation; either version 3 of the License, or
//	(at your option) any later version.
//
//	This program is distributed in the hope that it will be useful,
//	but WITHOUT ANY WARRANTY; without even the implied warranty of
//	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//	GNU General Public License for more details.
//
//	You should have received a copy of the GNU Lesser General Public License
//	along with this program.  If not, see <http://www.gnu.org/licenses/>.

var DEBUG = 0;


var transparent = 1;
var mWidth = 50;
var mHeight= 40;
var buffer = [];

var paletteSet = ",;+ltgti!lI?/\\|)(1}{][rcvzjftJUOQocxfXhqwWB8&%$#@"
var palette = "";
var palSize = 0;
var fireHeight= mHeight;

var isInitiated=0;

function setupFire(width, height) // minimum values = 3
{
	mWidth = width || mWidth;
	mHeight = height || mHeight;
	isInitiated=0;
}

function reversePalette()
{
	palette = palette.split("").reverse().join("");
}

function setTransparency(setting)
{
	transparent=setting;
}

function seedPalette()
{
	if(transparent)
		palette = " ";
	else
		palette = "";

	var palSetSize=paletteSet.length-1;
	var _step = 1;

	for (var i=0; i < ( (mWidth*_step)>palSetSize?palSetSize:mWidth) ; i+=_step)
	{
		palette += paletteSet[i];
	}
	palette= palette.split("");
	palSize= palette.length-1;

	if (DEBUG)
	{
		document.write("<BR>palette size: "+palSetSize+" Buffer: "+mWidth+"x"+mHeight);
		document.write("<br><font color=\"#00FF00\">SAMPLED PALETTE: "+palette+"</font>");
	}
}

function initiate()
{
	// initiate the buffer
	for (i = 0; i <= mWidth*mHeight; i++) buffer[i]=0;	
	// initiate the pallete
	seedPalette();
	// change state
	isInitiated=1;
}

function fire()
{
	
	if (isInitiated==0)
	{
		initiate();
	}

	// define temporary screen buffer
	var screenb = "";
	var average=0;
	// randomize base - fuel the fire
	for (i = 0; i < Math.floor(mWidth/3); i++)
		buffer[Math.floor(Math.random() * mWidth) + mWidth * (mHeight-1)] = Math.floor(Math.random()*palSize);
	for (i = 0; i < Math.floor(mWidth/2); i++)
		buffer[Math.floor(Math.random() * mWidth) + mWidth * (mHeight-1)] = 0;
	for (i = 0; i < mWidth*(mHeight-1); i++)
	{
		//Smoothen the pixel values
		var average=(buffer[i] + buffer[i + 1] + buffer[i + mWidth] + buffer[i + mWidth + 1]) / 4;
		
		buffer[i] = Math.floor(average);
		// pass the pixel to the screen buffer
		screenb += palette[buffer[i]>palSize?palSize:buffer[i]];
		if (i % mWidth == 0)
			screenb += "\n";
	}
	document.getElementById("fire").firstChild.data = screenb;

	setTimeout(fire, 30);
}
